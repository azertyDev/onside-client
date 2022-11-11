import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";
import { ServerStyles, createStylesServer } from "@mantine/next";

// optional: you can provide your cache as a fist argument in createStylesServer function
const stylesServer = createStylesServer();

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: [
                initialProps.styles,
                <ServerStyles
                    html={initialProps.html}
                    server={stylesServer}
                    key="styles"
                />,
            ],
        };
    }

    render() {
        return (
            <Html>
                <Head></Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
