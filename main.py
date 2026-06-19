from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

app = FastAPI()

# Configurar CORS para permitir peticiones desde tu frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, cambia esto a tu dominio real
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de datos para validar el formulario
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

# Endpoint para enviar email
@app.post("/enviar-email")
async def enviar_email(form_data: ContactForm):
    try:
        print(f"📧 Intentando enviar email...")
        print(f"Usuario: {os.getenv('EMAIL_USER')}")
        print(f"Contraseña: {'*' * len(os.getenv('EMAIL_PASSWORD', ''))}")
        
        # Crear el mensaje
        msg = EmailMessage()
        msg['Subject'] = f"Nuevo mensaje de {form_data.name}"
        msg['From'] = os.getenv("EMAIL_USER")
        msg['To'] = os.getenv("EMAIL_USER")
        msg.set_content(f"""
Nombre: {form_data.name}
Email: {form_data.email}

Mensaje:
{form_data.message}
        """)

        print("📤 Conectando con Gmail...")
        
        # Enviar el email
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASSWORD"))
            smtp.send_message(msg)
        
        print("✅ Email enviado con éxito")
        return {"mensaje": "Email enviado con éxito"}

    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        print(f"❌ Tipo de error: {type(e).__name__}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# Endpoint de prueba
@app.get("/")
def root():
    return {"mensaje": "Backend del portafolio funcionando"}