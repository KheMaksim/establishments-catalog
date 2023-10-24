import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MainPage from "@/containers/mainPage/MainPage";
import Register from "@/containers/register/Register";
import Login from "@/containers/login/Login";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import { useAppSelector } from "@/hooks/hooks";
import EstablishmentForm from "@/containers/forms/EstablishmentForm";
import EstablishmentPage from "@/containers/establishmentPage/EstablishmentPage";
import "./App.css";

const App = () => {
    const user = useAppSelector((state) => state.user.userInfo);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route
                        path="/establishment/:id"
                        element={<EstablishmentPage />}
                    />

                    <Route
                        element={
                            <ProtectedRoute
                                isAllowed={!!user}
                                redirectPath={"/login"}
                            />
                        }
                    >
                        <Route path="/form" element={<EstablishmentForm />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
