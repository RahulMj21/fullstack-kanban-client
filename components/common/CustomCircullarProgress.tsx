import CircularProgress, {
    CircularProgressProps,
    circularProgressClasses,
} from "@mui/material/CircularProgress";

interface Props extends CircularProgressProps {
    progressColor?: string;
}

const CustomCircullarProgress = ({ progressColor, ...props }: Props) => {
    return (
        <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={{
                color: progressColor || "#333",
                animationDuration: "550ms",
                [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: "round",
                },
            }}
            size={16}
            thickness={4}
            {...props}
        />
    );
};

export default CustomCircullarProgress;
