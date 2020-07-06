package capgemini.desafio.service;

import java.util.List;
import java.util.Optional;

import capgemini.desafio.model.Conta;


public interface ContaService {

	List<Conta> getAllContas();

	Optional<Conta> getContaById(Long contaId);

	Conta createConta(Conta conta);	
	
	Conta depositaConta(Conta conta);
	
	boolean sacaConta(Conta conta);
	
	double devolveSaldo(Long Id);

	Conta updateConta(Conta contaDetails);

	void deleteConta(Conta conta);
}
