import DatePicker from "react-datepicker";

type Props = {
  error: string | undefined;
  showError: boolean;
  txHash: string | undefined;
  showTxHash: boolean;
  onSubmit(value: any): Promise<void>;
  setStartDate(date: Date): void;
  startDate: Date;
};

const RegisterView: React.FC<Props> = (props) => {
  return (
    <div className="my-5 nm-flat-white text-black p-8 rounded-2xl">
      <div className="text-left font-bold text-xl text-primary-p5 text-3xl pb-4 p-4 rounded-xl text-center">
        Register
      </div>
      <form className="py-6 justify-start">
        <div className="flex flex-wrap justify-between -mx-3 mb-6 w-full">
          <div className="w-full px-3 mb-6 md:mb-0 justify-between">
            <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
              Animal Name
            </label>
            <input
              className="appearance-none block w-full nm-inset-gray-100-sm text-gray-700 border border-gray-200 rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Rex"
            ></input>
          </div>

          <div className="w-full md:w-1/2">
            <div>
              <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                DOB
              </label>
              <div className="divide-y-2 divide-gray-200"></div>

              <div className="pl-3 w-full">
                <DatePicker
                  selected={props.startDate}
                  onChange={(date) => props.setStartDate(date)}
                  showYearDropdown
                  nextMonthButtonLabel=">"
                  previousMonthButtonLabel="<"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-5">
            <div>
              <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                GENDER
              </div>
              <div className="w-full flex justify-center">
                <div className="px-4 justify-between">
                  <input
                    type="radio"
                    className="form-radio p"
                    name="radio"
                    value="1"
                    checked
                  />
                  <span className="ml-2 w-1/2">Male</span>
                </div>
                <div className="px-4 w-1/2">
                  <input
                    type="radio"
                    className="form-radio"
                    name="radio"
                    value="2"
                  />
                  <span className="ml-2 w-1/2">Female</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap my-6 ">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Microchip ID
            </label>
            <input
              className="appearance-none block w-full nm-inset-gray-100-sm text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder=""
            ></input>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Dam ID
            </label>
            <input
              className="appearance-none block w-full nm-inset-gray-100-sm text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder=""
            ></input>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Sire ID
            </label>
            <input
              className="appearance-none block w-full nm-inset-gray-100-sm text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder=""
            ></input>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="h-10 w-20 text-white rounded-full bg-primary-p1 hover:bg-primary-p3 ">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
export default RegisterView;
