import { useState, type FormEvent } from 'react'
import useEstimate from '../hooks/useEstimate';
import Loading from "../components/loading";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [inputForm, setInputForm] = useState({
    zip: "",
    sqft: "",
    numOfBeds: "",
    numOfBaths: "",
    desiredFinishes: ""
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { loading, err, fetchEstimate } = useEstimate();
  const navigate = useNavigate();

  function validateForm() {
    const errors: string[] = [];

    if (!inputForm.zip || !/^\d{5}(-\d{4})?$/.test(inputForm.zip)) {
      errors.push("Please enter a valid 5-digit ZIP code.");
    }

    const sqft = Number(inputForm.sqft);
    if (!inputForm.sqft || isNaN(sqft) || sqft <= 0) {
      errors.push("Square footage must be a positive number.");
    }

    const beds = Number(inputForm.numOfBeds);
    if (!inputForm.numOfBeds || isNaN(beds) || beds < 0) {
      errors.push("Number of beds must be 0 or greater.");
    }

    const baths = Number(inputForm.numOfBaths);
    if (!inputForm.numOfBaths || isNaN(baths) || baths < 0) {
      errors.push("Number of baths must be 0 or greater.");
    }

    if (!inputForm.desiredFinishes) {
      errors.push("Please select a desired finish level.");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const estimate = await fetchEstimate(inputForm);
    if (estimate) {
      navigate("/response", { state: estimate });
    }
  }

  const isSubmitDisabled = loading || validationErrors.length > 0;

  if (loading) return <Loading />;

  return (
    <>
      <section id="center">
        <h1>AI Home Builder Estimator</h1>
        <form onSubmit={handleSubmit} className="form-fields flex flex-col items-center max-w-['80%'] mx-auto mb-4 gap-4">
          {(err || validationErrors.length > 0) && (
            <div className="alert alert-error max-w-[50%]">
              <div className="flex flex-col gap-1">
                {err && <span>{err}</span>}
                {validationErrors.map((error, index) => (
                  <span key={index}>{error}</span>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col items-start mx-auto gap-2 w-[50%]">
            <span className="label text">ZIP Code</span>
            <input type="text" className="input w-full" value={inputForm.zip} onChange={(e) => setInputForm({ ...inputForm, zip: e.target.value })} />
          </div>
          <div className="flex flex-col items-start mx-auto gap-2 w-[50%]">
            <span className="label text">SQFT</span>
            <input type="text" className="input w-full" value={inputForm.sqft} onChange={(e) => setInputForm({ ...inputForm, sqft: e.target.value })} />
          </div>
          <div className="flex flex-col items-start mx-auto gap-2 w-[50%]">
            <span className="label text">Number of Beds</span>
            <input type="number" className="input w-full" value={inputForm.numOfBeds} onChange={(e) => setInputForm({ ...inputForm, numOfBeds: e.target.value })} />
          </div>
          <div className="flex flex-col items-start mx-auto gap-2 w-[50%]">
            <span className="label text">Number of Baths</span>
            <input type='number' className="input w-full" value={inputForm.numOfBaths} onChange={(e) => setInputForm({ ...inputForm, numOfBaths: e.target.value })} />
          </div>
          <div className="flex flex-col items-start mx-auto gap-2 w-[50%]">
            <span className="label text">Desired Finishes</span>
            <select onChange={(e) => setInputForm({ ...inputForm, desiredFinishes: e.target.value })} value={inputForm.desiredFinishes} className='select w-full'>
              <option value='' disabled>Select a Finish</option>
              <option value='basic'>Basic</option>
              <option value='standard'>Standard</option>
              <option value='luxury'>Luxury</option>
            </select>
          </div>
          <button type='submit' className="btn btn-accent w-30" disabled={isSubmitDisabled}>Submit</button>
        </form>
      </section>
    </>
  )
}
