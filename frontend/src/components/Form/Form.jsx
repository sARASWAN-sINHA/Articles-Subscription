import { NavLink } from "react-router-dom";
import Button from "../Button";

function Form(props) {
  const {
    headerName,
    headerInfo,
    labels,
    checkBoxList,
    buttonInfo,
    links,
    onSubmitFunction,
  } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitFunction();
  };
  return (
    <div className="bg-white space-x-1 p-8 my-6 h-full w-fit flex flex-col gap-4 rounded-3xl">
      <h1 className="text-3xl">{headerName.toUpperCase()}</h1>
      <hr />
      <div className="text-gray-500">{headerInfo}</div>
      <form
        className=" mx-auto flex flex-col gap-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        {labels?.map((labelInfo, i) => {
          return (
            <div className="p-2" key={i}>
              <label
                htmlFor={labelInfo.labelName.toLowerCase()}
                className={`block mb-2 text-base font-medium text-gray-500 ${labelInfo.required
                  ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                  : ""
                  }`}
              >
                {labelInfo.labelName}
              </label>
              {labelInfo.inputType != 'textarea' ?
                <input
                  className={`w-full p-4 border-2 bg-gray-100 text-gray-500 border-gray-400 focus:border-4 focus:border-gray-400 invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500 `}
                  type={labelInfo.inputType}
                  aria-describedby="helper-text-explanation"
                  placeholder={labelInfo.placeholder}
                  value={labelInfo.value}
                  onChange={(e) => labelInfo.changeHandler(e)}
                /> :
                <textarea
                  className={`w-full p-4 border-2 bg-gray-100 text-gray-500 border-gray-400 focus:border-4 focus:border-gray-400 invalid:border-pink-500 invalid:text-pink-600  focus:invalid:border-pink-500 focus:invalid:ring-pink-500 `}

                  aria-describedby="helper-text-explanation"
                  placeholder={labelInfo.placeholder}
                  value={labelInfo.value}
                  onChange={(e) => labelInfo.changeHandler(e)}
                />
              }

              {labelInfo.hintInfo && (
                <ul id="helper-text-explanation">
                  {labelInfo.hintInfo.map((hint, i) => {
                    return (
                      <li key={i} className="text-gray-400">
                        {hint}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
        {checkBoxList &&
          checkBoxList.map((checkBox, i) => {
            return (
              <div key={i} className="flex items-center mb-4">
                <input
                  id={checkBox.id}
                  type="checkbox"
                  defaultChecked={checkBox.value}
                  value={checkBox.value}
                  onClick={checkBox.clickHandler}
                />
                <label
                  htmlFor={checkBox.id}
                  className="ms-2 font-medium text-gray-400 text-base"
                >
                  {checkBox.message}
                </label>
              </div>
            );
          })}
        {buttonInfo && (
          <Button
            type={"submit"}
            text={buttonInfo.text}
            linkTo={buttonInfo.linkTo}
          />
        )}
      </form>
      {links?.map((link, i) => {
        return (
          <div key={i} className="flex justify-center ">
            <NavLink to={link.to} className="underline">
              {link.linkDesc}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}

export default Form;
