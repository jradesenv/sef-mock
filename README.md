# ENDPOINTS  
- Consulta de Processos:  
/api/processo?numeroProcesso=11111 (retorna processo unico)  
/api/processo?numeroProcesso=12345 (retorna lista)  
    
- Consulta DI (ENTREGUES):    
https://sef-mock.herokuapp.com/api/di?pIdentificacao=83422726640&pIdentificacao_type=cpf&pNumDI=12345 (DI Entregue)  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=83422726640&pIdentificacao_type=cpf&pNumDI=11111 (DI Entregue exibindo GUIA)  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=83422726640&pIdentificacao_type=cpf&pNumDI=22222 (DI Entregue exibindo DARE)  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=12345 (DI Entregue com saldo devedor)  
  
- Consulta DI (LIBERADAS):     
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=11111 (DI Liberada com mensagem)  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=22222 (DI Liberada com GUIA)  
  
- Consulta DI (NAO LIBERADAS):  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=33333 (DI Nao Liberada e Bloqueada)  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=44444 (DI Nao Liberada e Mensagem)   
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=55555 (DI Nao Liberada e Mensagem e DARE)  
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=66666 (DI Nao Liberada com Saldo Devedor)   
https://sef-mock.herokuapp.com/api/di?pIdentificacao=67695137000189&pIdentificacao_type=cnpj&pNumDI=77777 (DI Nao Liberada com Valor Faltante)      

  
# Ao fazer commit para o branch master, o deploy é feito automaticamente para:    
https://sef-mock.herokuapp.com/  