package edu.sen602.group.calendar.event.dao;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import edu.sen602.group.calendar.event.domain.Event;

public class EventDAO {
	
	private Map<Integer, Event> events = new HashMap<>();
	
	private int idIndex = 0;
	
	public Collection<Event> getAll(){
		return events.values();
	}
	
	public int add(Event event) {
		int id = idIndex;
		event.setId(id);
		events.put(id, event);
		idIndex++;
		return id;
	}
	
	public void delete(Event event) {
		deleteById(event.getId());
	}
	
	public void deleteById(int id) {
		events.remove(id);
	}
	
	public boolean replace(Event replacement) {
		Event old = events.get(replacement.getId());
		if (old == null) return false;
		events.put(replacement.getId(), replacement);
		return true;
	}
	
	public Event get(int id) {
		return events.get(id);
	}
}
