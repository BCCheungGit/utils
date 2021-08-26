from os import get_terminal_size
import smtplib 
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
import csv



email = "ocm154.bot@gmail.com"
pas = "zydzbhgbxnvdfaqp"

carriers=['@mms.att.net', '@myboostmobile.com', '@mms.cricketwireless.net', '@vzwpix.com', '@tmomail.net', '@pm.sprint.com', '@vmpix.com']



def get_all_emails():
    phonenumbers=[]
    with open('C:\\Users\\samsu\\Downloads\\oversea-chinese-mission-export-864209.csv', 'r', encoding="utf8", 
    ) as cellphones:
        reader = csv.reader(cellphones)

        for row in reader:
            if not ((row[3]) == "formatted phone" or (row[3]) ==""):
                for carrier in carriers:
                    phonenumbers.append(str(row[0])+str(row[3])+carrier)
                    send(str(row[0]), str(row[3])+carrier)
            #send("9178367360"+carrier)
            
                    #print(phonenumbers)
    finallist=set(phonenumbers)
    print(finallist)
    return finallist

def send(name, mail_address):
    #sms_gateway = '9178367360@tmomail.net'
    ## sms_gateway = '9178367360@vtext.com'
    #print('mailing ' + mail_address) 
    sms_gateway = mail_address
    # The server we use to send emails in our case it will be gmail but every email provider has a different smtp 
    # and port is also provided by the email provider.
    smtp = "smtp.gmail.com" 
    port = 587
    # This will start our email server
    server = smtplib.SMTP(smtp,port)
    # Starting the server
    server.starttls()
    # Now we need to login
    server.login(email,pas)

    # Now we use the MIME module to structure our message.
    msg = MIMEMultipart()
    msg['From'] = email
    msg['To'] = sms_gateway

    #media = 'https://raw.githubusercontent.com/SWKCheung/cdn/main/mail_image.PNG'
    media = "C:\ocm\mail\mail_image.PNG"
    # Make sure you add a new line in the subject
    msg['Subject'] = "Application of Constituent Membership [Last Step]\n"
    # Make sure you also add new lines to your body
    body = 'Hello '+ name

    # and then attach that body furthermore you can also send html content.
    msg.attach(MIMEText(body, 'plain'))

    # attach image below
    fp = open(media, 'rb')
    msg_img = MIMEImage(fp.read())
    fp.close()

    msg.attach(msg_img)

    sms = msg.as_string()

    server.sendmail(email,sms_gateway,sms)

    # lastly quit the server
    server.quit()

ready_mailbox=get_all_emails()

