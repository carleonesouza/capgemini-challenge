package capgemini.desafio.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import capgemini.desafio.model.Conta;
import capgemini.desafio.repository.ContaRepository;

@Service
public class ContaServiceImpl implements ContaService {
	
	@Autowired
	private ContaRepository contaRepository;

	@Override
	public List<Conta> getAllContas() {
		return this.contaRepository.findAll();
	}

	@Override
	public Optional<Conta> getContaById(Long contaId) {
		return this.contaRepository.findById(contaId);
	}

	@Override
	public Conta createConta(Conta conta) {
		return this.contaRepository.save(conta);
	}

	@Override
	public Conta updateConta(Conta contaDetails) {
		return this.contaRepository.save(contaDetails);
	}

	@Override
	public void deleteConta(Conta conta) {
		this.contaRepository.delete(conta);
		
	}

	@Override
	public Conta depositaConta(Conta contaDetails) {
		return this.contaRepository.save(contaDetails);
	}

	@Override
	public boolean sacaConta(Conta contaDetails) {
		 this.contaRepository.save(contaDetails);
		 return true;
	}

	@Override
	public double devolveSaldo(Long id) {
		return this.contaRepository.findById(id).get().devolveSaldo();
	}

}
