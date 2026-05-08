import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";
import { useLocation } from "react-router-dom";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();
  const location = useLocation();

  // ✅ Dynamic API URL
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProducts = async () => {
      try {
        dispatch(fetchStatusActions.markFetchingStarted());

        const path = location.pathname;
        let apiUrl = `${API_BASE}/api/products`;

        if (path.includes("/men")) apiUrl = `${API_BASE}/api/products/category/men`;
        else if (path.includes("/women")) apiUrl = `${API_BASE}/api/products/category/women`;
        else if (path.includes("/kids")) apiUrl = `${API_BASE}/api/products/category/kids`;
        else if (path.includes("/home-living")) apiUrl = `${API_BASE}/api/products/category/home-living`;
        else if (path.includes("/beauty")) apiUrl = `${API_BASE}/api/products/category/beauty`;
        else if (path.includes("/studio")) apiUrl = `${API_BASE}/api/products/category/studio`;

        console.log("Fetching from:", apiUrl);

        const response = await fetch(apiUrl, { signal });
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        dispatch(itemsActions.addInitialItems(data.products || data));
        dispatch(fetchStatusActions.markFetchDone());
        dispatch(fetchStatusActions.markFetchingFinished());
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
          dispatch(fetchStatusActions.markFetchingFinished());
        }
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [location.pathname, dispatch]);

  return <></>;
};

export default FetchItems;