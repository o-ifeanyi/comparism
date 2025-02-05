import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

void navigateTo({
  required BuildContext context,
  required String title,
  required Widget screen,
  bool replace = false,
}) {
  Route route = Platform.isIOS
      ? CupertinoPageRoute(builder: (_) => screen, title: title)
      : MaterialPageRoute(builder: (_) => screen);
  replace
      ? Navigator.of(context).pushReplacement(route)
      : Navigator.of(context).push(route);
}

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    if (Platform.isIOS) {
      return const CupertinoApp(
        debugShowCheckedModeBanner: false,
        home: SplashScreen(),
      );
    }
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SplashScreen(),
    );
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero).then((_) {
      navigateTo(
        context: context,
        title: 'Colors',
        screen: const ColorsScreen(),
        replace: true,
      );
    });
  }

  @override
  Widget build(BuildContext context) => const Scaffold();
}

final colors = [
  Colors.red,
  Colors.green,
  Colors.blue,
  Colors.orange,
  Colors.purple,
  Colors.black
];

class ColorsScreen extends StatelessWidget {
  const ColorsScreen({super.key});

  Widget builderChild(BuildContext context, int index) {
    return GestureDetector(
      onTap: () => navigateTo(
        context: context,
        title: 'Color detail',
        screen: ColorDetailScreen(
          color: colors[index],
        ),
      ),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          color: colors[index],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    const gridDelegate = SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 2,
      mainAxisSpacing: 8,
      crossAxisSpacing: 8,
      mainAxisExtent: 150,
    );
    if (Platform.isIOS) {
      return CupertinoPageScaffold(
        child: CustomScrollView(
          slivers: [
            CupertinoSliverNavigationBar(
              largeTitle: const Text('Colors'),
              backgroundColor: CupertinoTheme.of(context)
                  .barBackgroundColor
                  .withOpacity(0.6),
            ),
            SliverPadding(
              padding: const EdgeInsets.fromLTRB(15, 0, 15, 30),
              sliver: SliverGrid.builder(
                gridDelegate: gridDelegate,
                itemBuilder: builderChild,
                itemCount: colors.length,
              ),
            ),
          ],
        ),
      );
    }
    return Scaffold(
      appBar: AppBar(
        title: const Text('Colors'),
        scrolledUnderElevation: 0,
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      ),
      body: GridView.builder(
        padding: const EdgeInsets.fromLTRB(15, 0, 15, 0),
        gridDelegate: gridDelegate,
        itemBuilder: builderChild,
        itemCount: colors.length,
      ),
    );
  }
}

class ColorDetailScreen extends StatelessWidget {
  const ColorDetailScreen({
    required this.color,
    super.key,
  });

  final Color color;

  @override
  Widget build(BuildContext context) {
    final builderChild = Container(
      height: 300,
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        color: color,
      ),
    );
    if (Platform.isIOS) {
      return CupertinoPageScaffold(
        child: CustomScrollView(
          slivers: [
            CupertinoSliverNavigationBar(
              largeTitle: const Text('Color detail'),
              backgroundColor: CupertinoTheme.of(context)
                  .barBackgroundColor
                  .withOpacity(0.6),
            ),
            SliverPadding(
              padding: const EdgeInsets.fromLTRB(15, 0, 15, 30),
              sliver: SliverList.separated(
                separatorBuilder: (_, __) => const SizedBox(height: 20),
                itemBuilder: (_, index) {
                  return builderChild;
                },
                itemCount: 4,
              ),
            ),
          ],
        ),
      );
    }
    return Scaffold(
      appBar: AppBar(
        title: const Text('Color detail'),
        scrolledUnderElevation: 0,
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      ),
      body: ListView.separated(
        padding: const EdgeInsets.fromLTRB(15, 0, 15, 30),
        separatorBuilder: (_, __) => const SizedBox(height: 20),
        itemBuilder: (_, index) {
          return builderChild;
        },
        itemCount: 4,
      ),
    );
  }
}
