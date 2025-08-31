export async function start_read_rfids(ip_adress: string) {
  try {
    const res = await fetch(
      `${ip_adress}/InventoryController/startInventoryRequest`,
      {
        method: "POST", // Hoặc "GET"
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "Reader-startInventoryRequest",
          backgroundInventory: "false",
          tagFilter: {
            tagMemoryBank: "epc",
            bitOffset: 0,
            bitLength: 0,
            hexMask: null,
          },
        }),
      }
    );
    if (!res.ok) {
      // Không phải 2xx (ví dụ 500, 400)
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return false;
  }
}

export async function stop_read_rfids(ip_address: string) {
  try {
    const res = await fetch(
      `${ip_address}/InventoryController/stopInventoryRequest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "Reader-stopInventoryRequest" }),
      }
    );

    if (!res.ok) {
      // Không phải 2xx (ví dụ 500, 400)
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return false;
  }
}

export async function tagReportingDataAndIndex(ip_address: string) {
  try {
    const res = await fetch(
      `${ip_address}/InventoryController/tagReportingDataAndIndex`,
      {
        method: "POST", // Hoặc "GET"
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      // Không phải 2xx (ví dụ 500, 400)
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return data.data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}

export async function clearCacheTagAndIndex(ip_address: string) {
  try {
    const res = await fetch(
      `${ip_address}/InventoryController/clearCacheTagAndIndex`,
      {
        method: "POST", // Hoặc "GET"
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return true;
  } catch (error) {
    console.error("API Error:", error);
    return false;
  }
}
