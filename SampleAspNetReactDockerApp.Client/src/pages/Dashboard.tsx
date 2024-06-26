﻿import {ReactElement, useEffect } from "react";
import useAuthStore from "@/store/authStore.ts";
import {useNavigate} from "react-router-dom";
import SharedVideosList from "@/components/SharedVideoList";

//unused component
export default function Dashboard(): ReactElement {
    const isLogged = useAuthStore((state) => state.loginStatus);
    const navigate = useNavigate();

    useEffect(() => {
        switch (isLogged) {
            case "authenticated":
                break;
            case "unauthenticated":
                navigate("/login");
                break;
            case "pending":
                break;
            default:
                break;
        }
    }, [isLogged, navigate]);

    return (
        <section className="container mt-10 flex flex-col items-center text-center">
            <SharedVideosList/>
        </section>
    );
}

// export default function Dashboard(): ReactElement {
//     const [data, setData] = useState<WeatherForecast[] | null>(null);

//     const isLogged = useAuthStore((state) => state.loginStatus);
//     const navigate = useNavigate();
//     const jwtToken = useAuthStore((state) => state.accessToken);
//     const refreshToken = useAuthStore((state) => state.refreshToken);
//     const hydrate = useAuthStore((state) => state.hydrate);

//     const {t} = useTranslation();

//     useEffect(() => {
//         switch (isLogged) {
//             case "authenticated":
//                 fetchData();
//                 break;
//             case "unauthenticated":
//                 navigate("/login");
//                 break;
//             case "pending":
//                 break;
//             default:
//                 break;
//         }
//     }, [isLogged]);

//     const fetchData = async () => {
//         try {
//             const weatherForecast = await getWeatherForecast({
//                 jwtToken,
//                 refreshToken,
//                 hydrate
//             });
//             setData([...weatherForecast]);
//         } catch (error) {
//             console.error("Error fetching weather forecast: ", error);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center">
//             <h1 className="text-2xl font-bold my-4">
//                 {t("dashboard.title")}
//             </h1>
//             <div className="w-1/2">
//                 <p className="text-center text-lg mb-4">
//                     {t("dashboard.subtitle")}
//                 </p>
//             </div>
//             {data ? (
//                 <div className="w-1/2 rounded-lg dark:shadow-accent p-4 transition duration-500 ease-in-out transform hover:scale-105">
//                     <DataTable columns={weatherForecastColumns} data={data} 
//                                 title={t("dashboard.table.title")} 
//                                 titleClassName={"text-center text-xl font-bold py-2"}
//                     />
//                 </div>
                
//             ) : (
//                 <p>Loading data from API...</p>
//             )}
//         </div>   
//     );
// }


