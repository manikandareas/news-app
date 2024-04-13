"use client";
import { signUp } from "@/actions/auth.actions";
import { SignUpSchema } from "@/types/auth";
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

type SignUpFormProps = {};

const SignUpForm: React.FC<SignUpFormProps> = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            confirmPassword: "",
            password: "",
            username: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
        const res = await signUp(data);

        if (res.error) {
            return toast.error(res.error);
        }
        toast.success("Account created successfully");
        return router.push("/");
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-sm w-full"
            >
                <div>
                    <h1 className="text-3xl font-bold">
                        Welcome to{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400">
                            {"{ News }"}
                        </span>
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Sign-up account to get started{" "}
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
                                Choose a strong password.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmation Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter the same password as before, for
                                verification.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};
export default SignUpForm;
