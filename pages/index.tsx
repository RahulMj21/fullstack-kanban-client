import { Typography } from "@mui/material";
import BaseLayout from "../components/layout/BaseLayout";

export default function Home() {
    return (
        <BaseLayout title="Boards">
            <Typography variant="h3">Kanban Board</Typography>
        </BaseLayout>
    );
}
