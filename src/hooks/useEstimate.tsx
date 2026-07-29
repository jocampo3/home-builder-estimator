import { useEffect, useState } from "react";
import { getEstimate } from "../api/estimate";

export default function useEstimate() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [err, setError] = useState<string | null>(null);

  async function fetchEstimate(formData) {
    console.log('fetching estimate');

    setLoading(true)

    try {
      setError(null);
      const data = await getEstimate(formData);
      setData(data)
      setLoading(false)

    } catch {
      setError('Error when fetching prompt');
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
