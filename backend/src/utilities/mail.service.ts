import nodemailer , {SendMailOptions} from "nodemailer";

export const sendMail = async (mailId : string, OTP? : string) => {
    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'ingalemanish7@gmail.com',
            pass : 'fgismbrmrqikajgg'
        }
    });

    const mailOptions : SendMailOptions = {
        from : 'ingalemanish7@gmail.com',
        to : mailId,
        subject : 'OTP',
        html : 
        `
        <div style="padding:1rem; border: 1px solid white; text-align : center;">
        <h1 style="margin : 1rem 0;">Welcome to FINTECH World</h1>
        <p>Your OTP for registration is ${OTP}</p>
        </div>
        
        `
    };

    await transporter.sendMail(mailOptions);
}