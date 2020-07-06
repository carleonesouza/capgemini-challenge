package capgemini.desafio.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import capgemini.desafio.beans.ContaDTO;
import capgemini.desafio.exception.ResourceNotFoundException;
import capgemini.desafio.model.Conta;
import capgemini.desafio.service.ContaService;

@CrossOrigin
@RestController
@RequestMapping
public class ContaController {
	

	@Autowired
	private ContaService contaService;

	@Autowired
    private ModelMapper modelMapper;
	
	@GetMapping("/contas")
	public List<ContaDTO> getAllContas() {
		List<Conta> Contas = contaService.getAllContas();
		return Contas.stream()
        .map(this::convertToDto)
        .collect(Collectors.toList());
	}

	@GetMapping("/contas/{id}")
	public ResponseEntity<ContaDTO> getContaById(@PathVariable(value = "id") Long contaId) {
		Conta conta= contaService.getContaById(contaId).get();
		return ResponseEntity.ok().body(convertToDto(conta));
	}
	
	@GetMapping("/contas/saldo/{id}")
	public double devolveSalado(@PathVariable(value = "id") Long contaId) throws ResourceNotFoundException {
			Conta conta = contaService.getContaById(contaId)
					.orElseThrow(() -> new ResourceNotFoundException("Conta não foi encontrada com esse ID :: " + contaId));
			return contaService.devolveSaldo(conta.getId());
	}

	@PostMapping("/contas/add")
	public Conta createConta(@Validated @RequestBody ContaDTO contaDTO) {
		return contaService.createConta(convertToEntity(contaDTO));
	}
	
	@PostMapping("/contas/deposita/{id}")
	public Conta deposicaConta(@PathVariable(value = "id") Long contaId, @Validated @RequestBody ContaDTO contaDTO) throws ResourceNotFoundException {
		Conta conta = contaService.getContaById(contaId)
				.orElseThrow(() -> new ResourceNotFoundException("Conta não foi encontrada com esse ID :: " + contaId));
		conta.deposita(contaDTO.getValor());
		return contaService.depositaConta(conta);
	}
	
	@PostMapping("/contas/saca/{id}")
	public boolean sacaConta(@PathVariable(value = "id") Long contaId, @Validated @RequestBody ContaDTO contaDTO) throws ResourceNotFoundException {
		Conta conta = contaService.getContaById(contaId)
				.orElseThrow(() -> new ResourceNotFoundException("Conta não foi encontrada com esse ID :: " + contaId));
		if(conta.saca(contaDTO.getValor())) {
			return contaService.sacaConta(conta);
		}
		return false;
	
	}
	@CrossOrigin
	@PutMapping("/contas/{id}")
	public ResponseEntity<Conta> updateConta(@PathVariable(value = "id") Long contaId,
			@Validated @RequestBody ContaDTO contaDTO) throws ResourceNotFoundException {
		Conta conta = contaService.getContaById(contaId)
				.orElseThrow(() -> new ResourceNotFoundException("Conta não foi encontrada com esse ID :: " + contaId));

		conta.setUsername(contaDTO.getUsername());
		conta.setLimite(contaDTO.getLimite());
		conta.setNumero(contaDTO.getNumero());
		conta.setSaldo(contaDTO.getSaldo());		
		final Conta updatedConta = contaService.updateConta(conta);
		return ResponseEntity.ok(updatedConta);
	}

	@DeleteMapping("/contas/{id}")
	public Map<String, Boolean> deleteConta(@PathVariable(value = "id") Long contaId)
			throws ResourceNotFoundException {
		Conta conta = contaService.getContaById(contaId)
				.orElseThrow(() -> new ResourceNotFoundException("Conta não foi encontrada com esse ID:: " + contaId));

		contaService.deleteConta(conta);
		
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
	
	public ContaDTO convertToDto(Conta conta) {
		ContaDTO contaDTO = modelMapper.map(conta, ContaDTO.class);
		return contaDTO;
	}
	
	public Conta convertToEntity(ContaDTO contaDTO) {
		Conta conta = modelMapper.map(contaDTO, Conta.class);
		return conta;
	}

}
