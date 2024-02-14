import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useForm, FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [registerUser] = useRegisterMutation();
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onsubmit = async (data: FieldValues) => {
    console.log(data);
    const userInfo = await registerUser(data).unwrap();

    dispatch(setUser(userInfo));
    navigate("/");

    toast.success("Registered Successfully, Login to continue");
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="flex items-center justify-center h-[100vh] flex-col space-y-3">
      <Input
        required
        className="w-72"
        {...register("email")}
        id="email"
        placeholder="Email"
      />
      <Input
        required
        className="w-72"
        {...register("password")}
        id="password"
        placeholder="Password"
      />
      <Button className="w-72" variant={"outline"} type="submit">
        Register
      </Button>

      <p className="text-sm">
        Already have an account?{""}
        <Link to="/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
