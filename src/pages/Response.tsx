import { useLocation } from "react-router-dom";

export default function Response() {
  const { state } = useLocation();

  if (!state) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error max-w-md">
          <span>No estimate data found. Please submit the form again.</span>
        </div>
      </section>
    );
  }

  const estimate = Array.isArray(state.estimate) ? state.estimate : [];
  const factors = Array.isArray(state.factors) ? state.factors : [];
  const recommendations = Array.isArray(state.recommendations) ? state.recommendations : [];
  const assumptions = Array.isArray(state.assumptions) ? state.assumptions : [];

  const hasMalformedData = estimate.length === 0 && factors.length === 0 && recommendations.length === 0 && assumptions.length === 0;

  if (hasMalformedData) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error max-w-md">
          <span>Estimate data is incomplete or malformed. Please try again.</span>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Your Home Build Estimate
        </h1>
        <p className="text-base-content/70 mt-2">
          AI-generated estimate based on your project details
        </p>
      </div>

      {/* Estimate */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            Estimated Cost Range
          </h2>

          <div className="space-y-2 mt-4">
            {estimate.map((item: string, index: number) => (
              <div
                key={index}
                className="bg-base-100 rounded-lg p-4"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Factors */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            Key Cost Factors
          </h2>

          <ul className="list-disc list-inside space-y-2 mt-4">
            {factors.map((factor: string, index: number) => (
              <li key={index}>
                {factor}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            Recommendations
          </h2>

          <div className="space-y-3 mt-4">
            {recommendations.map((recommendation: string, index: number) => (
              <div
                key={index}
                className="alert alert-info"
              >
                <span>{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assumptions */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            Assumptions
          </h2>

          <ul className="list-disc list-inside space-y-2 mt-4">
            {assumptions.map((assumption: string, index: number) => (
              <li key={index}>
                {assumption}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          className="btn btn-primary"
          onClick={() => window.history.back()}
        >
          Create Another Estimate
        </button>
      </div>
    </section>
  );
}
