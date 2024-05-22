interface CircularProgressBarProps {
    color: string;
    title: string;
}

export function LoadingProgressCircle({color, title}: CircularProgressBarProps) {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeFilled = circumference * 0.25;
    const strokeUnfilled = circumference * 0.75;

    const getTextColor = (bgColor: string) => {
        // This is a very basic way to determine if the color is light or dark.
        // More sophisticated methods might involve calculating luminance.
        const color = bgColor.replace('#', '');
        const r = parseInt(color.substr(0, 2), 16);
        const g = parseInt(color.substr(2, 2), 16);
        const b = parseInt(color.substr(4, 2), 16);
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF';
    };


    const textColor = getTextColor(color);

    return (
        <div className="flex flex-col items-center flex-1 p-2">
            <div className="flex text-base font-semibold uppercase tracking-wider text-center items-end" style={{color: color, height: "40px"}}>
                {title}
            </div>
            <div className="relative" style={{width: '100%', paddingTop: '100%'}}>

                <svg width="120" height="120" className="absolute top-0 left-0 size-full" viewBox="0 0 120 120">
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke={`${color}20`}
                        strokeWidth="10"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="10"
                        strokeDasharray={`${strokeFilled} ${strokeUnfilled}`}
                        strokeDashoffset={0}
                        style={{
                            transformOrigin: "center center",
                            transformBox: "fill-box",
                            animation: "rotate 2s linear infinite"
                        }}
                    />
                    <style>{`
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                `}</style>
                    <circle
                        cx="60"
                        cy="60"
                        r="40"
                        fill={color}
                    />
                    <text
                        x="50%"
                        y="50%"
                        dy=".3em"
                        textAnchor="middle"
                        fontSize="12"
                        fill={textColor}
                    >
                        Loading...
                    </text>
                </svg>
            </div>
        </div>
    );
}