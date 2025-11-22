// components/Charts/BudgetChart.jsx
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const BudgetChart = ({
    data,
    type = 'bar',
    title = 'Budget Overview',
    height = 400,
    showLegend = true,
    animation = true,
    subTitle
}) => {
    // Default color palette
    const colorPalette = [
        'rgba(147, 51, 234, 0.8)',  // Purple
        'rgba(139, 92, 246, 0.8)',  // Violet
        'rgba(124, 58, 237, 0.8)',  // Indigo
        'rgba(109, 40, 217, 0.8)',  // Deep Purple
        'rgba(91, 33, 182, 0.8)',   // Dark Purple
        'rgba(76, 29, 149, 0.8)',   // Very Dark Purple
    ];

    const borderColorPalette = [
        'rgba(147, 51, 234, 1)',
        'rgba(139, 92, 246, 1)',
        'rgba(124, 58, 237, 1)',
        'rgba(109, 40, 217, 1)',
        'rgba(91, 33, 182, 1)',
        'rgba(76, 29, 149, 1)',
    ];

    // Prepare chart data based on type
    const getChartData = () => {
        const labels = data.map(item =>
            item.label || item.month || item.purpose || item.category || item.date
        );
        const values = data.map(item =>
            item.value || item.budget || item.amount || item.total || item.price
        );


        const baseDataset = {
            label: subTitle,
            data: values,
        };

        switch (type) {
            case 'bar':
                return {
                    labels,
                    datasets: [{
                        ...baseDataset,
                        backgroundColor: colorPalette.slice(0, data.length),
                        borderColor: borderColorPalette.slice(0, data.length),
                        borderWidth: 2,
                        borderRadius: 8,
                    }],
                };

            case 'line':
                return {
                    labels,
                    datasets: [{
                        ...baseDataset,
                        borderColor: 'rgba(147, 51, 234, 1)',
                        backgroundColor: 'rgba(147, 51, 234, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: borderColorPalette,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                    }],
                };

            case 'doughnut':
                return {
                    labels,
                    datasets: [{
                        ...baseDataset,
                        backgroundColor: colorPalette.slice(0, data.length),
                        borderColor: borderColorPalette.slice(0, data.length),
                        borderWidth: 2,
                        hoverOffset: 15,
                    }],
                };

            default:
                return {
                    labels,
                    datasets: [baseDataset],
                };
        }
    };

    // Chart options
    const getChartOptions = () => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: showLegend,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12,
                        family: "'Inter', sans-serif"
                    }
                }
            },
            title: {
                display: !!title,
                text: title,
                font: {
                    size: 16,
                    weight: 'bold',
                    family: "'Inter', sans-serif"
                },
                padding: 20,
                color: '#374151'
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#374151',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    label: function (context) {
                        return `₹${context.parsed.y?.toLocaleString() || context.parsed?.toLocaleString()}`;
                    }
                }
            }
        },
        scales: type === 'bar' ? {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    callback: function (value) {
                        return '₹' + value.toLocaleString();
                    },
                    font: {
                        family: "'Inter', sans-serif"
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        family: "'Inter', sans-serif"
                    }
                }
            }
        } : {},
        animation: animation ? {
            duration: 1500,
            easing: 'easeInOutQuart'
        } : false
    });

    const renderChart = () => {
        const chartProps = {
            data: getChartData(),
            options: getChartOptions(),
            height: height,
        };

        switch (type) {
            case 'bar':
                return <Bar {...chartProps} />;
            case 'line':
                return <Line {...chartProps} />;
            case 'doughnut':
                return <Doughnut {...chartProps} />;
            default:
                return <Bar {...chartProps} />;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div style={{ height: `${height}px` }}>
                {renderChart()}
            </div>
        </div>
    );
};

export default BudgetChart;