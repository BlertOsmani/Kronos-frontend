import { Formik } from "formik";
import { priorities, prioritySeverities } from "../../utils/constants";
import Button from "../ui/Button";
import { ListFilter, Search } from "lucide-react";
import DatePicker from "../ui/DatePicker";
import Checkbox from "../ui/Checkbox";
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { format } from "date-fns";
import TextField from "../ui/TextField";

export default function TaskFilters({onSubmit}) {
  const [openFilters, setOpenFilters] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event){
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div>
      <Formik
        initialValues={{
          search: "",
          due_date: "",
          priority: [],
          created_at_after: "",
          created_at_before: ""
        }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ values, setFieldValue, handleChange, handleSubmit }) => {

          const hasActiveFilters =
            values.due_date ||
            values.priority.length > 0 ||
            values.created_at_after ||
            values.created_at_before;

          return(
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-1">
              <TextField
                  name="search"
                  value={values.search}
                  placeholder="Search tasks"
                  className={'flex w-full !pl-8'}
                  icon={<Search size={18} color="gray"/>}
                  onChange={(value) => {
                    handleChange(value);
                    handleSubmit();
                  }}
                />
            <div ref={filterRef} className="flex relative justify-between items-center">
                <Button
                  className={`relative ${openFilters ? 'bg-neutral-100' : ''}`}
                  title={"Filter"}
                  icon={<ListFilter size={18} />}
                  iconPosition="left"
                  severity="white"
                  type={"button"}
                  onClick={() => setOpenFilters(!openFilters)}
                />
              {openFilters && (
                <div className="shadow border flex flex-col px-2 pt-1 pb-2 z-30 rounded bg-white absolute top-10 left-0 w-80">
                <div className="p-1 flex justify-between items-center">
                  <span className="font-semibold">Filters</span>
                  <div className="flex gap-1 items-center">
                    {hasActiveFilters && (
                      <div className="flex items-center gap-1">
                          <Button
                            title={"Apply"}
                            severity="primary"
                            size="sm"
                            type={'submit'}
                          />
                          <Button
                            title={"Clear"}
                            severity="white"
                            type={'button'}
                            size="sm"
                            onClick={() => {
                              setFieldValue("priority", []);
                              setFieldValue("due_date", "");
                              setFieldValue('created_at_after', "");
                              setFieldValue("created_at_before", "");
                              handleSubmit();
                            }}
                            />
                        </div>
                      )}
                  </div>
                </div>
                <hr />
                <div className="flex flex-col mt-5 gap-5">
                  <div className="flex flex-col gap-2">
                    <span className="flex items-center text-sm text-gray-600">
                      Priority&nbsp;
                      {values.priority.length > 0 && (
                        <span className="text-gray-500 text-xs">
                          ({values.priority.length})
                        </span>
                      )}
                    </span>
                    <div className="flex gap-1 px-2 flex-wrap">
                      {priorities.map((priority) => {
                        const isChecked = values.priority.includes(priority);

                        return (
                          <Checkbox
                            key={priority}
                            label={priority}
                            isButtonStyle
                            checked={isChecked}
                            labelStyle={`${prioritySeverities[priority]}`}
                            onChange={(checked) => {
                              const newPriorities = checked
                                ? [...values.priority, priority]
                                : values.priority.filter((p) => p !== priority);
                                
                              setFieldValue("priority", newPriorities);
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <span className="text-sm text-gray-600">Due</span>
                    <div className="px-2 flex w-full">
                      <DatePicker
                        dateFormat={"dd/MM/yyyy"}
                        placeholder="13/02/1999"
                        selectedDate={values.due_date}
                        onChange={(date) => {
                          setFieldValue("due_date", format(new Date(date), 'yyyy-MM-dd'))
                        }}
                        className={'flex w-full'}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                      <span className="text-sm text-gray-600">Created</span>
                      <div className="flex justify-between gap-3 w-full px-2 items-center">
                        <div className="w-1/2 flex flex-col">
                          <span className="text-xs text-gray-500">From</span>
                          <DatePicker
                            dateFormat={"dd/MM/yyyy"}
                            placeholder="13/02/1999"
                            selectedDate={values.created_at_after}
                            onChange={(date) => setFieldValue("created_at_after", format(new Date(date), 'yyyy-MM-dd'))}
                            className={'flex w-full'}
                          />
                        </div>
                        <div className="w-1/2 flex flex-col">
                          <span className="text-xs text-gray-500">To</span>
                            <DatePicker
                            dateFormat={"dd/MM/yyyy"}
                            placeholder="13/02/1999"
                            selectedDate={values.created_at_before}
                            onChange={(date) => setFieldValue("created_at_before", format(new Date(date), 'yyyy-MM-dd'))}
                            className={'flex w-full'}
                          />
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              )}
            </div>
            </div>
          </form>
            );
          }}
      </Formik>
    </div>
  );
}

TaskFilters.propTypes = {
  onSubmit: PropTypes.func
}
