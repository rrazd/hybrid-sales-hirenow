import { useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { flowSteps } from './data/flow';
import ControlPanel from './components/ControlPanel/ControlPanel';
import type { ProductRow } from './components/screens/SolutionBuilderScreen';
import PostJobScreen from './components/screens/PostJobScreen';
import PlanSelectionScreen from './components/screens/PlanSelectionScreen';
import PhoneModalScreen from './components/screens/PhoneModalScreen';
import JobPlanScreen from './components/screens/JobPlanScreen';
import AmyCRMScreen from './components/screens/AmyCRMScreen';
import AmyCRMDetailScreen from './components/screens/AmyCRMDetailScreen';
import SolutionBuilderScreen from './components/screens/SolutionBuilderScreen';
import CheckoutScreen from './components/screens/CheckoutScreen';
import CheckoutPageScreen from './components/screens/CheckoutPageScreen';
import OrderConfirmationScreen from './components/screens/OrderConfirmationScreen';
import QuotesListScreen from './components/screens/QuotesListScreen';
import styles from './App.module.css';

type SubView = 'quotes-list' | null;

export type QuoteAdvisorLayout = 'in-card' | 'floating';
export type FSHLayout = 'sep-line' | 'grouped';
export type PaymentTerm = 'NET30' | 'NET60' | 'NET90';

// Screen registry — add new screens here as they are built
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const screenRegistry: Record<string, React.ComponentType<any>> = {
  PostJobScreen,
  PlanSelectionScreen,
  PhoneModalScreen,
  JobPlanScreen,
  AmyCRMScreen,
  AmyCRMDetailScreen,
  SolutionBuilderScreen,
  CheckoutScreen,
  CheckoutPageScreen,
  OrderConfirmationScreen,
  QuotesListScreen,
};

// LinkedIn ANT theme overrides
const linkedInTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#0A66C2',
    colorBgBase: '#FDFAF5',
    fontFamily: "'LinkedIn Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    borderRadius: 8,
  },
};

// Steps that need at least one product to make sense
const STEPS_NEEDING_PRODUCTS = new Set([
  'solution-builder-filled', 'checkout', 'checkout-page', 'order-confirmation',
]);

const DEFAULT_PRODUCT: ProductRow = {
  key: 'fsh-default',
  role: 'Account Executive',
  feePct: 15,
  salary: 97800,
  feeAmount: 14670,
};

export default function App() {
  const getInitialStep = () => {
    const hash = window.location.hash.slice(1);
    return flowSteps.find(s => s.id === hash) ? hash : flowSteps[0].id;
  };

  const [currentStepId, setCurrentStepId] = useState(getInitialStep);
  const [subView, setSubView] = useState<SubView>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const [quoteAdvisorLayout, setQuoteAdvisorLayout] = useState<QuoteAdvisorLayout>('floating');
  const [fshLayout, setFSHLayout] = useState<FSHLayout>('grouped');
  const [quoteAdvisorContentOn, setQuoteAdvisorContentOn] = useState(false);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [paymentTerm, setPaymentTerm] = useState<PaymentTerm>('NET30');

  const hasProducts = products.length > 0;
  // Step 7 requires at least one product to continue
  const nextBlocked = currentStepId === 'solution-builder' && !hasProducts;

  const handleNavigate = (id: string) => {
    if (id === 'quotes-list') {
      setSubView('quotes-list');
      return;
    }
    setSubView(null);
    if (STEPS_NEEDING_PRODUCTS.has(id) && products.length === 0) {
      setProducts([DEFAULT_PRODUCT]);
    }
    setCurrentStepId(id);
    window.location.hash = id;
  };

  // Sync state if user navigates with browser back/forward
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (flowSteps.find(s => s.id === hash)) {
        setCurrentStepId(hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const currentStep = flowSteps.find(s => s.id === currentStepId) ?? flowSteps[0];
  const ScreenComponent = screenRegistry[currentStep.component];

  return (
    <ConfigProvider theme={linkedInTheme}>
      <div className={styles.layout}>
        <ControlPanel
          currentStepId={currentStepId}
          onNavigate={handleNavigate}
          isOpen={panelOpen}
          onCollapse={() => setPanelOpen(false)}
          quoteAdvisorLayout={quoteAdvisorLayout}
          onQuoteAdvisorLayoutChange={setQuoteAdvisorLayout}
          nextDisabled={nextBlocked}
          hasProducts={hasProducts}
          quoteAdvisorContentOn={quoteAdvisorContentOn}
          onQuoteAdvisorContentChange={setQuoteAdvisorContentOn}
          fshLayout={fshLayout}
          onFSHLayoutChange={setFSHLayout}
          onReset={() => {
            setFSHLayout('grouped');
            setQuoteAdvisorLayout('floating');
            setQuoteAdvisorContentOn(false);
          }}
        />

        {/* Collapsed tab — visible only when panel is collapsed */}
        <button
          className={`${styles.fab} ${panelOpen ? styles.fabHidden : ''}`}
          onClick={() => setPanelOpen(true)}
          aria-label="Open step navigator"
        >
          <span className={styles.fabArrow}>›</span>
          <span className={styles.fabLabel}>Step navigator</span>
        </button>

        <main className={styles.content}>
          {subView === 'quotes-list' ? (
            <QuotesListScreen onNavigate={handleNavigate} onReturn={() => setSubView(null)} fromStepId={currentStepId} />
          ) : ScreenComponent ? (
            <ScreenComponent
              quoteAdvisorLayout={quoteAdvisorLayout}
              currentStepId={currentStepId}
              onNavigate={handleNavigate}
              quoteAdvisorContentOn={quoteAdvisorContentOn}
              products={products}
              onProductsChange={setProducts}
              fshLayout={fshLayout}
              paymentTerm={paymentTerm}
              onPaymentTermChange={setPaymentTerm}
            />
          ) : (
            <div className={styles.placeholder}>
              <p>Screen not yet built</p>
            </div>
          )}
        </main>
      </div>
    </ConfigProvider>
  );
}
