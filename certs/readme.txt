Генерация ключей для работы сайта через https
После того как генерация ключей выполнена, для Windows:
Щелкнуть localhost.p12, далее - далее

1. Generate CA (Certificate Authority)
# Generate CA private key
openssl genrsa -out ca-key.pem 4096

# Create CA certificate (valid for 100 years)
openssl req -x509 -new -nodes -key ca-key.pem -sha256 -days 36500 \
  -subj "/C=RU/ST=TAT/L=NC/O=RA/OU=DevOps/CN=localhost CA/emailAddress=ramil@yabbarov.ru" \
  -out ca-cert.crt

2. Generate Server Certificate with SAN
# Generate server private key
openssl genrsa -out localhost-key.pem 2048

# Create CSR with SAN (critical!)
openssl req -new -key localhost-key.pem \
  -subj "/C=RU/ST=TAT/L=NC/O=RA/OU=DevOps/CN=localhost/emailAddress=ramil@yabbarov.ru" \
  -reqexts SAN \
  -config <(cat /etc/ssl/openssl.cnf <(printf "\n[SAN]\nsubjectAltName=DNS:localhost,IP:127.0.0.1")) \
  -out localhost-req.pem

# Sign with CA (with serverAuth extension)
openssl x509 -req -in localhost-req.pem -CA ca-cert.crt -CAkey ca-key.pem -CAcreateserial \
  -days 36500 -sha256 \
  -extfile <(printf "extendedKeyUsage=serverAuth\nsubjectAltName=DNS:localhost,IP:127.0.0.1") \
  -out localhost-cert.pem

3. Generate PKCS12 for Windows (same as original)
openssl pkcs12 -export -inkey localhost-key.pem -in localhost-cert.pem \
  -name "localhost" -certfile ca-cert.crt -caname "localhost CA" \
  -out localhost.p12

Key Improvements:
Added SAN support for both DNS (localhost) and IP (127.0.0.1)
Included serverAuth extension explicitly
Standardized key sizes (4096 for CA, 2048 for server)
Preserved all original DN fields (Country, State, Org, etc.)

Verification:

Check the certificates with:
# Verify CA
openssl x509 -in ca-cert.crt -text -noout

# Verify server cert (check SAN)
openssl x509 -in localhost-cert.pem -text -noout | grep -A1 "Subject Alternative Name"
openssl x509 -in localhost-cert.pem -text -noout

# Verify PKCS12
openssl pkcs12 -info -in localhost.p12 -nodes -passin pass:

Windows Trust Installation:
Double-click localhost.p12 → Import with password (if set)

