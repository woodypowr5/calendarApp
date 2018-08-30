package edu.sen602.group.calendar;

import java.util.Collection;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import edu.sen602.group.calendar.event.dao.EventDAO;
import edu.sen602.group.calendar.event.domain.Event;
import edu.sen602.group.calendar.exception.EventNotFound;


@RestController
@RequestMapping("/rest")
public class CalendarRestController {
	
	EventDAO eventdao = new EventDAO();
	
	@GetMapping(value="/events", produces= {"application/json"})
    public Collection<Event> getAllEvents() {
		return eventdao.getAll();
    }
	
	@GetMapping(value="/event/{id}", produces= {"application/json"})
    public Event getEvent(@PathVariable("id") int id) {
		Event event = eventdao.get(id);
		if (event == null) throw new EventNotFound();
		return event;
    }
	
	@PutMapping(value="/event", consumes= {"application/json"})
    public @ResponseBody int addEvent(@RequestBody Event event) {
		int id = eventdao.add(event);
        return id;
    }
	
	@PostMapping(value="/event", consumes= {"application/json"})
    public @ResponseBody String editEvent(@RequestBody Event event) {
		if (!eventdao.replace(event)) throw new EventNotFound();
        return "ok";
    }
	
	@DeleteMapping("/event/{id}")
	public void deleteEvent(@PathVariable("id") int id) {
		eventdao.deleteById(id);
	}
}
