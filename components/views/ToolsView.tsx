import { RecoveryTool } from '../tools/RecoveryTool';
import { GasEstimator } from '../GasEstimator';

interface ToolsViewProps {
    userAddress: string;
}

/**
 * Container component for utility tools like RecoveryTool and GasEstimator.
 */
export const ToolsView = ({ userAddress }: ToolsViewProps) => {
    return (
        <div className="content-animate">
            <h2 style={{ marginBottom: '2rem' }}>🛠️ Builder Utilities</h2>

            <div style={{ display: 'grid', gap: '2rem' }}>
                <GasEstimator />
                <RecoveryTool userAddress={userAddress} />
            </div>
        </div>
    );
};
