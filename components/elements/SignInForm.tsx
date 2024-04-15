"use client";
import { signIn, signUp } from "@/actions/auth.actions";
import { SignInSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Link from "next/link";

type SignInFormProps = {};

const SignInForm: React.FC<SignInFormProps> = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            password: "",
            username: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
        const res = await signIn(data);

        if (res.error) {
            return toast.error(res.error);
        }
        toast.success(res.success);
        return router.push("/editor");
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-sm w-full"
            >
                <div>
                    <h1 className="text-3xl font-bold">
                        Welcome back to{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400">
                            {"{ News }"}
                        </span>
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Sign-in to your account to continue using this app
                    </p>
                </div>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your private password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    className="w-full bg-gradient-to-r from-teal-400 to-sky-400"
                    type="submit"
                >
                    Sign in
                </Button>
                <p className="text-xs text-muted-foreground">
                    <span>Already have an account?</span>{" "}
                    <Link className="text-teal-500" href={"/auth/sign-up"}>
                        Sign-up here
                    </Link>
                </p>
            </form>
        </Form>
    );
};
export default SignInForm;
