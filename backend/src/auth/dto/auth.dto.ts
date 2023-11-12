import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

// export Authdto
export class AuthDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'password cannot be empty.' })
  @IsString()
  @Matches(/^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,60}$/, {
    message:
      'Password should contain capital letter, small letter, number & special char',
  })
  password: string;
}
