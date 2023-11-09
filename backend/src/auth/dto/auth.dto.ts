import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

// export Authdto
export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,10}$/)
  password: string;
}
