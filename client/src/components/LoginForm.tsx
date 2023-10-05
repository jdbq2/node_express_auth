import { FieldErrors, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface FormValues {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { register, handleSubmit, formState } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });
    const { errors } = formState;

    const onError = (errors: FieldErrors<FormValues>) => {
        console.log(errors);
    };

    const onSubmit = (data: FormValues) => {
        console.log("formulario Enviado", data);
    };

    return (
        <form
            className=" flex flex-col justify-start items-center w-50 p-5"
            onSubmit={handleSubmit(onSubmit, onError)}
            noValidate
        >
            <div className="w-full flex flex-col justify-between items-center p-2">
                <label className="w-full font-bold text-white" htmlFor="email">
                    Email:
                </label>
                <input
                    className="w-full p-2 rounded-md"
                    type="email"
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
                <p className="w-full font-bold text-red-500 text-center">
                    {errors.email && errors.email.message}
                </p>
            </div>

            <div className="w-full flex flex-col justify-between items-center p-2">
                <label
                    className="w-full font-bold text-white"
                    htmlFor="password"
                >
                    Password:
                </label>
                <input
                    className="w-full p-2 rounded-md"
                    type="password"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message:
                                "The password must have a min of 8 characters",
                        },
                        maxLength: {
                            value: 12,
                            message:
                                "The password must have a max of 12 characters",
                        },
                    })}
                />
                <p className="w-full font-bold text-red-500 text-center">
                    {errors.password && errors.password.message}
                </p>
            </div>

            <button className="button mt-5 bg-[white] px-2 py-1" type="submit">
                Iniciar Sesión
            </button>
            <button className="button mt-5 bg-[white] px-2 py-1" type="submit">
                Iniciar Sesión con Google
            </button>
            <Link to="/auth/register">
                <button
                    className="button mt-5 bg-[white] px-2 py-1"
                    type="submit"
                >
                    Registrarse
                </button>
            </Link>
        </form>
    );
};

export default LoginForm;
