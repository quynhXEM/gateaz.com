import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "@/i18n/navigation";

export default function AuthButton() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter()
  
  return isAuthenticated ? (
    <Avatar>
      <AvatarImage src={user?.avatar} />
      <AvatarFallback>AD</AvatarFallback>
    </Avatar>
  ) : (
    <Button variant='default' onClick={() => {
      router.push("/login")
    }} className="h-9">Login
    </Button>
  );
}
