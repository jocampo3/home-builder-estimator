import { useEffect, useState } from "react";
import { getEstimate } from "../api/estimate";

export default function useEstimate() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [err, setError] = useState<string | null>(null);

  async function fetchEstimate(formData) {
    setLoading(true)

    try {
      setError(null);
      const data = await getEstimate(formData);
      setData(data)
      setLoading(false)
      return data;
    } catch {
      setError('Error when sending prompt');
    }

    setLoading(false);
  }

  return {
    data,
    loading,
    err,
    fetchEstimate
  };
}
