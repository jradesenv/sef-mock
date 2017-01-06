# ENDPOINTS  
- Consulta de Processos:  
/api/processo?numeroProcesso=11111 (retorna processo unico)  
/api/processo?numeroProcesso=12345 (retorna lista)  
    
- Consulta DI:    
/api/di?pIdentificacao=83422726640&pIdentificacao_type=cpf&pNumDI=12345 (DI Entregue)  
/api/di?pIdentificacao=83422726640&pIdentificacao_type=cpf&pNumDI=11111 (DI Entregue exibindo GUIA)  
/api/di?pIdentificacao=83422726640&pIdentificacao_type=cpf&pNumDI=22222 (DI Entregue exibindo DARE)  
/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=12345 (DI Entregue com saldo devedor)  
  
  
# Ao fazer commit para o branch master, o deploy é feito automaticamente para:    
https://sef-mock.herokuapp.com/  
 