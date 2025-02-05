//
//  ContentView.swift
//  navigate-swift
//
//  Created by Ifeanyi Onuoha on 04/02/2025.
//

import SwiftUI

struct ContentView: View {
    let colors: [Color] = [.red, .green, .blue, .orange, .purple, .black]
    let columns = Array(repeating: GridItem(.flexible()), count: 2)
    
    var body: some View {
        NavigationStack {
            VStack {
                ScrollView(.vertical, showsIndicators: false) {
                    LazyVGrid(columns: columns) {
                        ForEach(colors, id: \.self) { item in
                            NavigationLink(destination: DetailView(color: item), label: {
                                RoundedRectangle(cornerRadius: 16)
                                    .frame(height: 150)
                                    .foregroundColor(item)
                            })
                        }
                    }
                }
            }
            .navigationBarTitleDisplayMode(.large)
            .navigationTitle("Colors")
            .toolbarBackground(.thinMaterial, for: .navigationBar)
            .padding(.horizontal, 15)
        }
    }
}

#Preview {
    ContentView()
}

struct DetailView: View {
    let color: Color
    
    var body: some View {
        VStack {
            ScrollView(.vertical, showsIndicators: false) {
                VStack(spacing: 20) {
                    ForEach(0...4, id: \.self) { item in
                        RoundedRectangle(cornerRadius: 16)
                            .frame(height: 300)
                            .foregroundColor(color)
                    }
                }
            }
            .navigationBarTitleDisplayMode(.large)
            .navigationTitle("Color detail")
            .toolbarBackground(.thinMaterial, for: .navigationBar)
            .padding(.horizontal, 15)
        }
    }
}
