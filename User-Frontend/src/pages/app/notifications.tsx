import Header2 from "../../components/Header2";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import type { INotifications } from "../../@types/interface";
import axios from "axios";
import { BACKEND_DOMAIN } from "../../data/data";
import Loading from "../../components/Loading";
import dayjs from "dayjs";

export default function Notification() {
  const [notifications, setNotifications] = useState<INotifications[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_DOMAIN}/api/v1/users/notifications`,
          { withCredentials: true },
        );
        setNotifications(response.data.data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <main className="flex flex-col w-full h-screen font-roboto pt-18 pl-56 bg-bg-color text-zinc-900">
      <Header2 />
      <Sidebar />
      <div className="h-full  w-full p-5">
        <form className="flex  flex-col w-full h-full flex-1 mt-3">
          <h1 className="font-bold text-2xl">My Notifications</h1>

          <section className="flex flex-col gap-3 h-full w-full mt-3 overflow-y-auto">
            {loading ? (
              <Loading />
            ) : (
              notifications.map((notif, i) => (
                <article
                  key={i}
                  className={`flex flex-row w-full items-center justify-between bg-[#ECECEC] rounded-md py-1 px-2 hover:bg-[#CACACA] transition-colors duration-150 ease-in-out cursor-pointer ${
                    notif.seen ? "" : "font-bold"
                  }`}
                >
                  <p>{notif.text}</p>
                  <p>{dayjs(notif.createdAt).format("MM/DD/YY, h:mm A")}</p>
                </article>
              ))
            )}
          </section>
        </form>
      </div>
    </main>
  );
}