import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useForm, FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onsubmit = async (data: FieldValues) => {
    toast.loading("Logging in...", { duration: 1000 });
    try {
      const info = await login(data).unwrap();
      dispatch(setUser(info?.data?.user));
      navigate("/");
      console.log(info);
      toast.success("User logged in successful!", { duration: 2000 });
    } catch (error) {
      toast.error("Something went wrong!", { duration: 3000 });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="flex items-center justify-center  h-[100vh]  flex-col space-y-3">
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
        Login
      </Button>

      <p className="text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;
