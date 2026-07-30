import { useState } from "react";
import { getEstimate, type FormData } from "../api/estimate";

export default function useEstimate() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Record<string, unknown>>({});
  const [err, setError] = useState<string | null>(null);

  async function fetchEstimate(formData: FormData) {
    setLoading(true)

    try {
      setError(null);
      const data = await getEstimate(formData);
      setData(data)
      setLoading(false)
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error when sending prompt';
      setError(message);
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
