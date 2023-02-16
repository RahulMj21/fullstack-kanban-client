import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../styles/theme";
import { SnackbarProvider } from "notistack";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <SnackbarProvider maxSnack={3}>
                        <Component {...pageProps} />
                    </SnackbarProvider>
                </ThemeProvider>
            </Provider>
        </QueryClientProvider>
    );
}
