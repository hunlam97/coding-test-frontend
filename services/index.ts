import { AuthService } from "./auth.service";
import { authGateway, blogGateway } from "gateways";
import { BlogService } from "./blog.service";

export const authService = new AuthService(authGateway);
export const blogService = new BlogService(blogGateway);
