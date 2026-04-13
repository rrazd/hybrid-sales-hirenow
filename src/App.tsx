import { useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { flowSteps } from './data/flow';
import ControlPanel from './components/ControlPanel/ControlPanel';
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
import styles from './App.module.css';

export type QuoteAdvisorLayout = 'in-card' | 'floating';

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

export default function App() {
  const [currentStepId, setCurrentStepId] = useState(flowSteps[0].id);
  const [panelOpen, setPanelOpen] = useState(true);
  const [quoteAdvisorLayout, setQuoteAdvisorLayout] = useState<QuoteAdvisorLayout>('floating');
  const [nextBlocked, setNextBlocked] = useState(false);
  const [hasProducts, setHasProducts] = useState(false);
  const [quoteAdvisorContentOn, setQuoteAdvisorContentOn] = useState(false);

  const handleNavigate = (id: string) => {
    setNextBlocked(false);
    setCurrentStepId(id);
  };

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
        />

        {/* FAB — visible only when panel is collapsed */}
        <button
          className={`${styles.fab} ${panelOpen ? styles.fabHidden : ''}`}
          onClick={() => setPanelOpen(true)}
          aria-label="Expand panel"
        >
          <span className={styles.fabArrow}>›</span>
        </button>

        <main className={styles.content}>
          {ScreenComponent ? (
            <ScreenComponent
              quoteAdvisorLayout={quoteAdvisorLayout}
              currentStepId={currentStepId}
              onNavigate={handleNavigate}
              onCanContinueChange={(can: boolean) => setNextBlocked(!can)}
              quoteAdvisorContentOn={quoteAdvisorContentOn}
              onHasProductsChange={setHasProducts}
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
