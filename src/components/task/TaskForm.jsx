import { Formik } from "formik";
import * as Yup from 'yup';
import Label from "../ui/Label";
import TextField from "../ui/TextField";
import TextArea from "../ui/TextArea";
import SelectList from "../ui/SelectList";
import Button from "../ui/Button";
import DatePicker from "../ui/DatePicker";
import PropTypes from 'prop-types';
import { priorities, statuses } from "../../utils/constants";

export default function TaskForm({task, onSubmit}) {
    const initialValues = task || {
        title: '',
        description: '',
        status: statuses[0],
        priority: priorities[0],
        due_date: ''
    }

  return (
    <div>
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                title: Yup.string().required('Title is required'),
                description: Yup.string(),
                status: Yup.string().required(),
                priority: Yup.string().required('Please select a priority'),
                due_date: Yup.date('Please select a due date')
            })}
            onSubmit={(values, {resetForm}) => {
                onSubmit(task?.id ? {id: task.id, ...values} : values);
                resetForm();
            }}
        >
            {({values, handleChange, errors, touched, handleSubmit, setFieldValue}) => (
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-3'>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Title"}/>
                            <TextField errorMessage={touched.title && errors.title} name="title" size='normal' className={"w-full"} type="text" value={values.title} onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col">
                            <Label className="pl-[1px] text-base text-left" value={"Description"}/>
                            <TextArea name="description" rows={6} size='normal' type="description" className={"w-full"} value={values.description} onChange={handleChange}/>
                        </div>
                        <div className="flex items-center gap-3">
                            {task && (
                            <div className="flex flex-col w-1/2">
                                <Label className="pl-[1px] text-base text-left" value={"Status"}/>
                                <SelectList
                                    options={statuses} 
                                    selectedValue={values.status}
                                    placeholder="Select the status"
                                    onChange={(value) => setFieldValue("status", value)}
                                    size="normal"
                                    className={'w-full'}
                                    errorMessage={touched.status && errors.status}
                                />
                            </div>
                            )}
                            <div className="flex flex-col w-1/2">
                                <Label className="pl-[1px] text-base text-left" value={"Priority"}/>
                                <SelectList
                                    options={priorities} 
                                    selectedValue={values.priority}
                                    placeholder="Select the priority"
                                    onChange={(value) => setFieldValue("priority", value)}
                                    size="normal"
                                    className={'w-full'}
                                    errorMessage={touched.priority && errors.priority}
                                />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <Label className="pl-[1px] text-base text-left" value={"Due date"}/>
                                <DatePicker
                                    selectedDate={values.due_date}
                                    onChange={(date) => setFieldValue("due_date", date)}
                                    dateFormat={"dd/MM/yyyy"}
                                    className={'w-full'}
                                    minDate={new Date()}
                                    errorMessage={touched.priority && errors.priority}
                                />
                            </div>
                        </div>
                        <div>
                            <Button type="submit" title={`${task ? 'Save': 'Add'}`} size='lg' className='w-full'/>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    </div>
  )
}

TaskForm.propTypes = {
    onSubmit: PropTypes.func,
    task: PropTypes.any
}
