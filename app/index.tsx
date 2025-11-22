import { WebView } from "react-native-webview";
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Platform } from "react-native";

export default function HomeScreen() {
    const DEV_URL = "http://10.0.2.2:5173";
    const PROD_URL = "https://nerdinary-front.vercel.app/";
    const sourceUrl = __DEV__ ? DEV_URL : PROD_URL;

    const insets = useSafeAreaInsets();

    const injectedJavaScript = `
        window.safeAreaInsets = {
            top: ${insets.top},
            bottom: ${insets.bottom},
            left: ${insets.left},
            right: ${insets.right}
        };
        true;
    `;

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={[
                    styles.container,
                    {
                        paddingBottom: Platform.OS === "ios" ? -20 : 0,
                    },
                ]}
            >
                <WebView
                    source={{ uri: sourceUrl }}
                    originWhitelist={["*"]}
                    allowsInlineMediaPlayback
                    startInLoadingState
                    javaScriptEnabled
                    domStorageEnabled
                    mixedContentMode="always"
                    style={{ flex: 1 }}
                    onLoadStart={() => console.log("WebView 시작")}
                    onLoadEnd={() => console.log("WebView 완료")}
                    onError={(e) => console.log("WebView 오류:", e.nativeEvent)}
                    injectedJavaScript={injectedJavaScript}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});
