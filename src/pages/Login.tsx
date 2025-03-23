import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gavel } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";

// Validation Schema
const loginSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid Indian phone number (10 digits starting with 6-9)."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      localStorage.setItem("user", JSON.stringify(data)); // Store user details
      toast.success("Login successful!");
      navigate("/main", { replace: true }); // Redirect to main page after login
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Gavel className="h-20 w-20 text-primary" />
              <div className="absolute bottom-0 right-0 text-right pr-4">
                <span className="text-sm uppercase tracking-widest font-semibold">Law</span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-1">Smart Analyser</h1>
          <p className="text-muted-foreground">Indian Legal AI Assistant</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your details to access legal assistance</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Vishal" className="bg-white text-black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="vishal@email.com" className="bg-white text-black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="9952225755" className="bg-white text-black" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-white text-black border border-gray-300 rounded-md shadow-md hover:bg-gray-100" 
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Loading..." : "Continue"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="border-t py-4">
            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="/terms" className="underline">Terms of Service</a> and{" "}
              <a href="/privacy" className="underline">Privacy Policy</a>.
            </p>
          </CardFooter>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">© 2025 Smart Analyser. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
