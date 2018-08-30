package edu.sen602.group.calendar.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND, reason="No such Event")
public class EventNotFound extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5748212376857532542L;

	
}
