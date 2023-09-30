import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
    barColors: {
        '0': 'rgba(245, 198, 6, .7)',
        '1.0': 'rgba(245, 6, 46, .7)',
    },
    shadowBlur: 5
});

const ProgressBar = () => {
    return <TopBarProgress />
};

export default ProgressBar