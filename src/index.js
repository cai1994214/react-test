import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import IndexRouter from "./router/IndexRouter.js";
import "./util/http.js";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
function App() {
	return (
		// 在根组件Provider设置store 子组件引入connect高阶组件都可以访问store
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<IndexRouter></IndexRouter>
			</PersistGate>
		</Provider>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
