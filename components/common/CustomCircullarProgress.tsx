import CircularProgress, {
    CircularProgressProps,
    circularProgressClasses,
} from "@mui/material/CircularProgress";

const CustomCircullarProgress = ({ ...props }: CircularProgressProps) => {
    return (
        <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={{
                color: "#333",
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
