import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function LayoutSkeleton() {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                background: "#333",
            }}
        >
            <Skeleton
                variant="rectangular"
                height="100vh"
                width="15rem"
                animation="wave"
            />
            <Box
                sx={{
                    width: "calc(100vw - 15rem)",
                    p: "2rem",
                }}
            >
                <Skeleton height={150} width={700} animation="wave" />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2rem",
                        mt: "2rem",
                    }}
                >
                    {[...new Array(4)].map(() => (
                        <Box key={Math.random()} width={300} gap="1rem">
                            <Skeleton
                                variant="rectangular"
                                height={50}
                                sx={{ mb: "0.8rem" }}
                                animation="wave"
                            />
                            <Skeleton
                                variant="rectangular"
                                height={500}
                                animation="wave"
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default LayoutSkeleton;
