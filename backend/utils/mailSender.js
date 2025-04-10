import nodemailer from 'nodemailer';

const mailSender=async(email,title,body)=>{
    try {
        const transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        const info=await transporter.sendMail({
            from :"StudySync",
            to:email,
            subject:title,
            html:body
        })

        return info;
    } catch (error) {
        console.log(`Error while sending mail:`,email);
        
    }

}

export default mailSender;