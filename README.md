# ENDPOINTS  
- Consulta de Processos:  
https://sef-mock.herokuapp.com/api/processo?numeroProcesso=11111 (retorna processo unico)  
https://sef-mock.herokuapp.com/api/processo?numeroProcesso=12345 (retorna lista)  
    
- Consulta DI (ENTREGUES):    
https://sef-mock.herokuapp.com/api/di?pIdentificacao=83422726640&pIdentificacao_type=cpf&pNumDI=0123456789 (DI Entregue)  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=83422726640&pIdentificacao_type=cpf&pNumDI=1234567890 (DI Entregue exibindo GUIA)  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=83422726640&pIdentificacao_type=cpf&pNumDI=2345678901 (DI Entregue exibindo DARE)  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=3456789012 (DI Entregue com saldo devedor)  
  
- Consulta DI (LIBERADAS):     
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=4567890123 (DI Liberada com mensagem)  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=5678901234 (DI Liberada com GUIA)  
  
- Consulta DI (NAO LIBERADAS):  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=6789012345 (DI Nao Liberada e Bloqueada com valor esperado)  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=7890123456 (DI Nao Liberada e Mensagem)   
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=8901234567 (DI Nao Liberada e Mensagem e DARE)  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=9012345678 (DI Nao Liberada com Saldo Devedor)   
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=0123456789 (DI Nao Liberada com Valor Faltante)      

  
# Ao fazer commit para o branch master, o deploy é feito automaticamente para:    
https://sef-mock.herokuapp.com/  
